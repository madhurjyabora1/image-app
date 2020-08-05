import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ photo }) => {
  console.log(photo.links.download_location);

  return (
    <>
      <div key={photo.id} className='grid__item card'>
        <div className='card__body'>
          <Link to={{ pathname: `/${photo.id}`, state: photo }}>
            <img src={photo.urls.small} alt='' />
          </Link>
          <div className='card__footer media'>
            <img
              src={photo.user.profile_image.small}
              alt=''
              width='30px'
              className='media__obj'
            />
            <div className='media__body'>
              <a href={photo.user.portfolio_url}>
                <span style={{ color: "white" }}>Image by {"  "}</span>
                {photo.user.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListItem;
