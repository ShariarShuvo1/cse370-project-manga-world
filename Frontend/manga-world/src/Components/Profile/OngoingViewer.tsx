import { useEffect, useState } from "react";
import WishlistController from "../../Controller/WishlistController";
import Pagination from "../Utility/Pagination";
import Ongoing from "../../Model/Ongoing";
import { Link } from "react-router-dom";
import wishlistController from "../../Controller/WishlistController";

interface OngoingViewerProps {
  userId: string;
}

function OngoingViewer(props: OngoingViewerProps) {
  const { userId } = props;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [ongoings, setOngoings] = useState<Ongoing[]>([]);

  useEffect(() => {
    if (userId) {
      WishlistController.getAllOngoing(userId, pageNumber - 1).then((res) => {
        setOngoings(res.data);
      });
    }
  }, [userId, pageNumber]);

  useEffect(() => {
    if (userId) {
      WishlistController.getTotalOnGoing(userId).then((res) => {
        setTotalItems(res.data);
      });
    }
  }, [userId]);

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  const removeItem = (og: Ongoing) => {
    wishlistController.deleteOngoing(og).then((res) => {
      if (userId) {
        WishlistController.getAllOngoing(userId, pageNumber - 1).then((res) => {
          setOngoings(res.data);
        });
      }
    });
  };

  return (
    <div>
      <div>
        {ongoings.map((ongoing, index) => (
          <div
            className="flex p-1 justify-between rounded me-10 bg-black bg-opacity-75 m-1 font-bold  border-2 text-white border-gray-500 hover:border-white hover:scale-105 hover:rounded-xl transition-transform duration-300 ease-in-out"
            key={index}
          >
            <Link
              to={{
                pathname: "/manga",
                search: `?data=${encodeURIComponent(
                  JSON.stringify({
                    manga: ongoing.manga,
                  })
                )}`,
              }}
              className="p-3 m-1 flex-grow"
            >
              {ongoing.manga.mtitle}
            </Link>
            <div
              onClick={() => {
                removeItem(ongoing);
              }}
              className="bg-red-700 p-3 m-1 rounded hover:scale-105 hover:cursor-pointer hover:bg-red-900 transition-transform duration-300 ease-in-out"
            >
              Remove
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

export default OngoingViewer;
