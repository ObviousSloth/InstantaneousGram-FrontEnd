import React, { useState } from 'react';
import UploadMedia from './UploadMedia';
import CreatePost from './CreatePost';

const PostMediaFlow = () => {
  const [mediaId, setMediaId] = useState(null);

  const handleMediaUploaded = (id) => {
    setMediaId(id);
  };

  return (
    <div>
      {!mediaId ? (
        <UploadMedia onMediaUploaded={handleMediaUploaded} />
      ) : (
        <CreatePost mediaId={mediaId} />
      )}
    </div>
  );
};

export default PostMediaFlow;
