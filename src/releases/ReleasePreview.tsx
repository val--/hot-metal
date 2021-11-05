import React from 'react';
import { IRelease } from '../types';
import ReleasePreviewImage from './ReleasePreviewImage'
import Artists from './artists/Artists'
import styled from 'styled-components';

interface ReleasePreviewProps {
    release: IRelease;
}

const ReleasePreviewContainer = styled.div`

    margin-bottom:10px;
    
    .releaseInformations {
    
    }
`

const ReleasePreview = ({ release }: ReleasePreviewProps) => {
    return (
          <ReleasePreviewContainer key={release.id}>
              <ReleasePreviewImage images={release.images} thumbnailSize='medium'/>
              <div className='releaseInformations'>
                <Artists artists={release.artists}/> - <span className='releaseName'>{release.name}</span>
              </div>
          </ReleasePreviewContainer>
    );
};

export default ReleasePreview;
