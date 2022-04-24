import styled from "@emotion/styled";
import React, { FC } from "react";
import ReactPlayer from "react-player";
import { WINDOW_WIDTH } from "../../../../constants/constants";

interface Props {
  videoCode: string;
  site: string;
}

enum VIDEO_SITES {
  "youtube" = "youtube",
  "vimeo" = "vimeo",
  "daily_motion" = "daily motion",
}

const VIDEO_SITES_BASE_URL = {
  [VIDEO_SITES.youtube]: "https://www.youtube.com/watch?v=",
  [VIDEO_SITES.vimeo]: "https://vimeo.com/",
  [VIDEO_SITES.daily_motion]: "https://dailymotion.com/video/",
};

const getVideoUrl = (site: string, videoCode: string): string => {
  if (site.toLowerCase() === VIDEO_SITES.youtube) {
    return VIDEO_SITES_BASE_URL[VIDEO_SITES.youtube] + videoCode;
  }

  if (site.toLowerCase() === VIDEO_SITES.vimeo) {
    return VIDEO_SITES_BASE_URL[VIDEO_SITES.vimeo] + videoCode;
  }

  if (site.toLowerCase() === VIDEO_SITES.daily_motion) {
    return VIDEO_SITES_BASE_URL[VIDEO_SITES.daily_motion] + videoCode;
  }

  return "";
};

const TrailerWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    height: 125px;
    width: auto;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TrailerDesktop = styled.span`
  display: block;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    display: none;
  }
`;

const TrailerMobile = styled.div`
  display: none;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    display: block;
  }
`;

const Trailer: FC<Props> = (props) => {
  const { site, videoCode } = props;

  return (
    <TrailerWrapper>
      <TrailerDesktop>
        {/* @ts-ignore */}
        <ReactPlayer
          url={getVideoUrl(site, videoCode)}
          width="500px"
          controls
          onError={(error) => console.error(error)}
        />
      </TrailerDesktop>
      <TrailerMobile>
        {/* @ts-ignore */}
        <ReactPlayer
          url={getVideoUrl(site, videoCode)}
          height="125px"
          width="auto"
          controls
          onError={(error) => console.error(error)}
        />
      </TrailerMobile>
    </TrailerWrapper>
  );
};

export default Trailer;
