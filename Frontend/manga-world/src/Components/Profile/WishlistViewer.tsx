import { useEffect, useState } from "react";
import WishlistController from "../../Controller/WishlistController";
import Pagination from "../Utility/Pagination";
import Ongoing from "../../Model/Ongoing";
import { Link } from "react-router-dom";
import wishlistController from "../../Controller/WishlistController";
import WishList from "../../Model/WishList";

interface WishlistViewerProps {
  userId: string;
}

function WishlistViewer(props: WishlistViewerProps) {
  const { userId } = props;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [wishlists, setWishlists] = useState<WishList[]>([]);

  useEffect(() => {
    if (userId) {
      WishlistController.getAllWishlist(userId, pageNumber - 1).then((res) => {
        setWishlists(res.data);
      });
    }
  }, [userId, pageNumber]);

  useEffect(() => {
    if (userId) {
      WishlistController.getTotalWishlist(userId).then((res) => {
        setTotalItems(res.data);
      });
    }
  }, [userId]);

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  const removeItem = (wl: WishList) => {
    wishlistController.deleteWishlist(wl).then((res) => {
      if (userId) {
        WishlistController.getAllWishlist(userId, pageNumber - 1).then(
          (res) => {
            setWishlists(res.data);
          }
        );
      }
    });
  };

  return (
    <div>
      <div>
        {wishlists.map((wishlist, index) => (
          <div
            className="flex p-1 justify-between rounded me-10 bg-black bg-opacity-75 m-1 font-bold  border-2 text-white border-gray-500 hover:border-white hover:scale-105 hover:rounded-xl transition-transform duration-300 ease-in-out"
            key={index}
          >
            <Link
              to={{
                pathname: "/manga",
                search: `?data=${encodeURIComponent(
                  JSON.stringify({
                    manga: wishlist.manga,
                  })
                )}`,
              }}
              className="p-3 m-1 flex-grow"
            >
              {wishlist.manga.mtitle}
            </Link>
            <div
              onClick={() => {
                removeItem(wishlist);
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

export default WishlistViewer;
