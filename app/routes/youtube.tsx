
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ytch from "yt-channel-info";
export async function loader() {
    let API_KEY = process.env.GOOGLE_KEY;
    let channelUsername = "UCj97pYy4kQXUjV43BIKHuPg";
    // let fetchUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${channelUsername}&key=${API_KEY}`;
    const payload = {
      channelId: channelUsername, // Required
      channelIdType: 0,
    };
    ;
    let yt = await ytch.getChannelInfo(payload)
    let stats=await ytch.getChannelStats(payload)
    
    return json({ channelData:{...yt,...stats} });
}

export default function Youtube() { 
    const { channelData } = useLoaderData();
    let joinDate = new Date(channelData.joinedDate);
    return (
      <div className="flex gap-3 max-w-4xl mx-auto shadow-sm">
        <div className="rounded overflow-hidden">
          <picture>
            <source
              media="(min-width: 1200px)"
              srcSet={channelData.authorThumbnails[2].url}
            />
            <source
              media="(min-width: 768px)"
              srcSet={channelData.authorThumbnails[1].url}
            />
            <source
              media="(min-width: 480px)"
              srcSet={channelData.authorThumbnails[0].url}
            />
            <img src={channelData.authorThumbnails[2].url} alt="Image" />
          </picture>
        </div>

        <div className="flex flex-col">
          <div className="font-caslon font-semibold">
            <a href={channelData.authorUrl}>{channelData.author}</a>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className=" font-light ">{channelData.subscriberText}</div>
            <div className=" font-light">
              Join date:{joinDate.toDateString()}
            </div>
            <div className=" font-light">
              Total Views:{channelData.viewCount}
            </div>
          </div>
        </div>
      </div>
    ); 
}