import { useEffect, useState } from "react";
import WishlistController from "../../Controller/WishlistController";
import Pagination from "../Utility/Pagination";
import Ongoing from "../../Model/Ongoing";
import { Link } from "react-router-dom";
import wishlistController from "../../Controller/WishlistController";
import Follow from "../../Model/Follow";
import FollowController from "../../Controller/FollowController";

interface FollowingViewerProps {
  userId: string;
}

function FollowingViewer(props: FollowingViewerProps) {
  const { userId } = props;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [follows, setFollows] = useState<Follow[]>([]);

  useEffect(() => {
    if (userId) {
      FollowController.getAllFollowing(userId, pageNumber - 1).then((res) => {
        setFollows(res.data);
      });
    }
  }, [userId, pageNumber]);

  useEffect(() => {
    if (userId) {
      FollowController.getTotalFollowing(userId).then((res) => {
        setTotalItems(res.data);
      });
    }
  }, [userId]);

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  const unfollow = (follow: Follow) => {
    FollowController.unfollow(follow).then((res) => {
      if (userId) {
        FollowController.getAllFollowing(userId, pageNumber - 1).then((res) => {
          setFollows(res.data);
        });
      }
    });
  };

  return (
    <div>
      <div>
        {follows.map((follow, index) => (
          <div
            className="flex p-1 justify-between rounded me-10 bg-black bg-opacity-75 m-1 font-bold  border-2 text-white border-gray-500 hover:border-white hover:scale-105 hover:rounded-xl transition-transform duration-300 ease-in-out"
            key={index}
          >
            <Link
              to={{
                pathname: "/author",
                search: `?data=${encodeURIComponent(
                  JSON.stringify({
                    author: follow.author,
                  })
                )}`,
              }}
              className="p-3 m-1 flex-grow"
            >
              {follow.author.aname}
            </Link>
            <div
              onClick={() => {
                unfollow(follow);
              }}
              className="bg-red-700 p-3 m-1 rounded hover:scale-105 hover:cursor-pointer hover:bg-red-900 transition-transform duration-300 ease-in-out"
            >
              Unfollow
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={20}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default FollowingViewer;
