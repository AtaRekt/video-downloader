import React, {useEffect, useState} from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
import loading from '../assets/loading.gif';

export default function Tiktok() {
  const [videoLink, setVideoLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (url, filename) => {
    await axios.get(url, {
      responseType: 'blob',
    })
    .then(async (res) => {
      await fileDownload(res.data, filename)
    })
  }

  const downloadVideo = async () => {
    setError("");
    setIsLoading(true);
    console.log(videoLink);
    axios.post("https://apiv3.uncoverecom.com/download-tiktok", {
      videoUrl: videoLink,
    }).then(async (response) => {
      var downloadUrl = response.data.video_hd;
      var random = Math.floor(Math.random() * 100000);
      await handleDownload(downloadUrl, `downloaded-video${random}-Bandoffads.mp4`);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error.response.data);
      setError(error.response.data.error);
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col gap-5 absolute w-full">
          <h1 className="text-center text-white text-4xl font-semibold">Tiktok Video Downloader</h1>
          <div className="grid grid-cols-1 w-full px-5 sm:px-20">
            <div className="bg-[#4E8EE5] w-full bg-opacity-20 flex gap-5 rounded-lg py-3 px-5">
              <input
                onChange={(e) => {setVideoLink(e.target.value);}}
                type="text"
                className="w-full bg-transparent text-white px-5 pr-0 md:pr-5 rounded-lg outline-none placeholder-white placeholder-opacity-50"
                placeholder="Enter a video link..."
              />
              <div onClick={downloadVideo} className="cursor-pointer bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center py-2 text-white bg-[#4E8EE5] rounded-lg px-6">
                <div className="h-8 flex items-center justify-center">
                  {isLoading ? <img className="w-8" src={loading} alt="loading..." /> : "Download"}
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