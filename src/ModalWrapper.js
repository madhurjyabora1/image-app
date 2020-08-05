import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "visible",
    borderRadius: "15px",
  },
};

const uuid = () => Math.random().toString(36).substring(7);
const toBlob = (src) =>
  new Promise((res) => {
    const img = document.createElement("img");
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    img.onload = ({ target }) => {
      c.width = target.naturalWidth;
      c.height = target.naturalHeight;
      ctx.drawImage(target, 0, 0);
      c.toBlob((b) => res(b), "image/jpeg", 0.75);
    };
    img.crossOrigin = "";
    img.src = src;
  });
const save = (blob, name = "image.png") => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.target = "_blank";
  a.download = name;
  a.click();
};

Modal.setAppElement("#root");

const ModalWrapper=()=> {
  const history = useHistory();
  const location = useLocation();
  const [photo, setPhoto] = useState(location.state);

  async function handleClick() {
    const url =
      photo.links.download_location +
      "?client_id=N1ZIgf1m1v9gZJhledpAOTXqS8HqL2DuiEyXZI9Uhsk";

    const response = await fetch(url);
    const json = await response.json();
    const imgUrl = json.url;

    const blob = await toBlob(imgUrl);
    save(blob, `${uuid()}.jpg`);
  }

  useEffect(() => {
    console.log(location.state)
    if (location.pathname && !location.state) {
        console.log("if block");
      let url =
        "https://api.unsplash.com/photos/" +
        location.pathname +
        "?client_id=N1ZIgf1m1v9gZJhledpAOTXqS8HqL2DuiEyXZI9Uhsk";
      axios.get(url).then((response) => {
        setPhoto(response.data);
        console.log("not doing");
      });
    }
  }, [location]);

  function close() {
    history.push("/");
  }

  return (
    !!photo && (
      <Modal isOpen={true} onRequestClose={close} style={customStyles}>
        <div className='imageHolder'>
          <div className='user-modal-body'>
            <img
              src={photo.user.profile_image.small}
              alt=''
              width='90px'
              className='user-modal'
            />
            <a
              href={photo.user.portfolio_url}
              
              className='just-name'
            >
              {photo.user.name}
            </a>
            {photo.user.instagram_username ? (
              <p className='insta-name'>@{photo.user.instagram_username}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <img src={photo.urls.small} alt='' />
        <button onClick={close} className='btn-close'>
          <i class='fa fa-close' style={{ color: "white" }} />
        </button>
        <div className='download-btn'>
          <button onClick={handleClick} className='loadMore'>
            Download
          </button>
        </div>
      </Modal>
    )
  );
}

export default ModalWrapper;
