
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ytch from "yt-channel-info";
export async function loader() {
    let API_KEY = process.env.GOOGLE_KEY;
    let channelUsername = [
      "UCj97pYy4kQXUjV43BIKHuPg",
      "UCnz-ZXXER4jOvuED5trXfEA",
      "UCtYuU2viKSpaozL6vHgHo4g",
      "UCylPRuiFv-JPqTtiTJiDWtA",
    ];
    // let fetchUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${channelUsername}&key=${API_KEY}`;
     const data = await Promise.all(
    channelUsername.map(async (channel) => {
      const payload = {
        channelId: channel,
        channelIdType: 0,
      };

      const yt = await ytch.getChannelInfo(payload);
      const stats = await ytch.getChannelStats(payload);
      return { ...yt, ...stats };
    })
  );
     
    return json({data});
}

export default function YoutubeContainer() {
    const { data: channelData } = useLoaderData();

  return (<>
    <div className="flex justify-center mb-3 text-3xl font-bold font-minion">Detail of most popular Tibetan youtubers</div>
    <div className="flex flex-col gap-2 p-4 shadow-sm justify-start items-start max-w-4xl mx-auto">
      {channelData.map((channel: any, index: number) => {
        return <Youtube key={channel.author + index} channelData={channel} />;
      })}
    </div>
    </>
  );
}
  
  
  
function Youtube({channelData}:{channelData:any}) { 
    let joinDate = new Date(channelData.joinedDate);
    return (
      <div className="flex gap-3  shadow-sm hover:scale-110">
        <div className="rounded overflow-hidden w-12">
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

