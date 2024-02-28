import { Link } from "react-router-dom";

export default function Homepage() {
    return (
      <>
        <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-5">
                <Link to={`tiktok`} className="text-center rounded-lg bg-opacity-80 px-5 hover:bg-opacity-100 flex items-center justify-center py-2 text-white bg-[#4E8EE5]">
                    Tiktok Download
                </Link>
                <Link to={`facebook`} className="text-center rounded-lg bg-opacity-80 px-5 hover:bg-opacity-100 flex items-center justify-center py-2 text-white bg-[#4E8EE5]">
                    Facebook Download
                </Link>
            </div>
        </div>
      </>
    );
  }