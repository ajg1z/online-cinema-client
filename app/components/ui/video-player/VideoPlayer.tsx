import cn from 'classnames';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import { FC } from 'react';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { selectUser } from '@/store/user/selectors';

import styles from './VideoPlayer.module.scss';
import AuthPlaceholder from './auth-placeholder/AuthPlaceholder';
import { IVideoPlayerProps } from './video-player.types';

const VideoPlayer: FC<IVideoPlayerProps> = ({ slug, videoSrc, poster }) => {
  const user = useTypedSelector(selectUser);

  return (
    <div className={cn(styles.wrapper, { 'h-96': !user })}>
      {user ? (
        <>
          <Plyr
            source={{
              poster,
              sources: [{ src: videoSrc }],
              type: 'video',
            }}
          />
        </>
      ) : (
        <AuthPlaceholder slug={slug} />
      )}
    </div>
  );
};

export default VideoPlayer;
