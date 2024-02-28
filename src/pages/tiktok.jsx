import React, { useEffect, useState } from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
import loading from '../assets/loading.gif';

export default function Tiktok() {
  const [videoLink, setVideoLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [cachedVideo, setCachedVideo] = useState(null);

  const handleDownload = async (url, filename) => {
    await axios.get(url, {
      responseType: 'blob',
    })
      .then(async (res) => {
        await fileDownload(res.data, filename)
      })
  }

  const getVideo = async () => {
    if (isLoading) return;
    if (videoLink === "") {
      setError("Please enter a video link");
      return;
    }
    setCachedVideo(null);
    setError("");
    setIsLoading(true);
    console.log(videoLink);
    axios.post("https://apiv3.uncoverecom.com/download-tiktok", {
      videoUrl: videoLink,
    }).then(async (response) => {
      setIsLoading(false);
      setCachedVideo(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.log(error.response.data);
      setError(error.response.data.error);
      setIsLoading(false);
    });
  };

  const download = async () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', cachedVideo.video.noWatermark, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
    let urlCreator = window.URL || window.webkitURL;
    let videoUrl = urlCreator.createObjectURL(this.response);
    let tag = document.createElement('a');
    tag.href = videoUrl;
    tag.target = '_blank';
    var random = Math.floor(Math.random() * 100000);
    tag.download = random+'-Bandoffads.mp4';
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
    };
    xhr.onerror = (err) => {};
    xhr.send();
  };

  const downloadWatermark = async () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', cachedVideo.video.watermark, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
    let urlCreator = window.URL || window.webkitURL;
    let videoUrl = urlCreator.createObjectURL(this.response);
    let tag = document.createElement('a');
    tag.href = videoUrl;
    tag.target = '_blank';
    var random = Math.floor(Math.random() * 100000);
    tag.download = random+'-Bandoffads.mp4';
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
    };
    xhr.onerror = (err) => {};
    xhr.send();
  };

  const downloadMp3 = async () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', cachedVideo.music.play_url, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
    let urlCreator = window.URL || window.webkitURL;
    let videoUrl = urlCreator.createObjectURL(this.response);
    let tag = document.createElement('a');
    tag.href = videoUrl;
    tag.target = '_blank';
    tag.download = cachedVideo.music.title + '-Bandoffads.mp3';
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
    };
    xhr.onerror = (err) => {};
    xhr.send();
  };

  const paste = () => {
    navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.readText().then(text => {
          setVideoLink(text);
        });
      } else {
        console.error('Clipboard izni reddedildi veya izin alınamadı.');
      }
    }).catch(error => {
      console.error('Hata: ', error);
    });
  }

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col gap-5 absolute w-full">
          <h1 className="text-center text-white text-4xl font-semibold">Tiktok Video Downloader</h1>
          <div className="grid grid-cols-1 w-full px-5 sm:px-20">
            <div className="bg-[#4E8EE5] w-full bg-opacity-20 flex gap-5 rounded-lg py-3 px-5">
              <input
                onChange={(e) => { setVideoLink(e.target.value); }}
                type="text"
                className="w-full bg-transparent text-white px-5 pr-0 md:pr-5 rounded-lg outline-none placeholder-white placeholder-opacity-50"
                placeholder="Enter a video link..."
                value={videoLink}
              />
              <div onClick={paste} className="bg-white px-8 cursor-pointer flex items-center justify-center py-2 text-white rounded-lg px-2">
                <div className="h-8 gap-2 flex items-center justify-center text-black hover:text-opacity-80 transition-all">
                  Paste
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                  </svg>
                </div>
              </div>
              <div onClick={getVideo} className="transition-all cursor-pointer bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center py-2 text-white bg-[#4E8EE5] rounded-lg px-6">
                <div className="h-8 flex items-center justify-center">
                  {isLoading ? <img className="w-8" src={loading} alt="loading..." /> : "Download"}
                </div>
              </div>
            </div>
            <div className={`flex items-center justify-center mt-3 ${cachedVideo != null ? "" : "hidden"}`}>
              <div className="flex gap-4">
                <div onClick={downloadWatermark} className="cursor-pointer bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center py-2 text-white bg-[#4E8EE5] rounded-lg px-6">
                  <div className="h-8 flex items-center justify-center">
                    With watermark
                  </div>
                </div>
                <div onClick={download} className="cursor-pointer bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center py-2 text-white bg-[#4E8EE5] rounded-lg px-6">
                  <div className="h-8 flex items-center justify-center">
                    Without watermark
                  </div>
                </div>
                <div onClick={downloadMp3} className="cursor-pointer bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center py-2 text-white bg-[#4E8EE5] rounded-lg px-6">
                  <div className="h-8 flex items-center justify-center">
                    Download MP3
                  </div>
                </div>
              </div>
            </div>
            <div className={`text-white absolute -bottom-8 ${error != "" ? "" : "hidden"}`}>
              {error}.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}