import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useOnClickOutside from "../../helpers/clickOutside";
import { deletePost, savePost, editPost } from "../../functions/post";
import { saveAs } from "file-saver";

export default function PostMenu({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
  token,
  postId,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
}) {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menu = useRef(null);
  const [editPost, setEditPost] = useState([]);
  useOnClickOutside(menu, () => setShowMenu(false));
  const saveHandler = async () => {
    savePost(postId, token);
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };
  const downloadImages = async () => {
    images.map((img) => {
      saveAs(img.url, "image.jpg");
    });
  };
  const deleteHandler = async () => {
    const res = await deletePost(postId, token);
    if (res.status === "ok") {
      postRef.current.remove();
    }
  };
  const editHandler = async () => {
    console.log(postId);
  };

  return (
    <ul className="post_menu" ref={menu}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items."
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      <div className="line"></div>
      {test && (
        <div onClick={() => editHandler()}>
          {" "}
          <MenuItem icon="edit_icon" title="Edit Post" />{" "}
        </div>
      )}
      <div onClick={() => editHandler()}></div>

      {imagesLength && (
        <div onClick={() => downloadImages()}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}

      {test && (
        <div onClick={() => deleteHandler()}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
}
