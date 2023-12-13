import Author from "../../Model/Author";
import { useEffect, useState } from "react";
import AuthorPicture from "../../Model/AuthorPicture";
import AuthorController from "../../Controller/AuthorController";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function AuthorCard(props: Author) {
  const [author, setAuthor] = useState<Author>(props);
  const [authorImage, setAuthorImage] = useState<AuthorPicture>();

  useEffect(() => {
    AuthorController.findAuthorPictureByAuthor(author).then((res) => {
      setAuthorImage(res.data);
    });
  }, [author]);

  return (
    <div className="w-56 overflow-hidden h-96 border-2 border-gray-600 hover:border-gray-400 text-white m-1 p-2 font-bold bg-black bg-opacity-70 rounded-lg hover:scale-105 hover:rounded-xl transition-transform duration-300 ease-in-out">
      <div className="overflow-hidden">
        <Link
          to={{
            pathname: "/author",
            search: `?data=${encodeURIComponent(
              JSON.stringify({
                author: author,
              })
            )}`,
          }}
        >
          <LazyLoadImage
            className={`rounded-lg object-cover w-56 h-64 flex-shrink-0 transform hover:scale-110 hover:rounded-xl transition-transform duration-500 ease-in-out`}
            src={authorImage?.apPicture}
            alt={author.aname}
            width={244}
            height={256}
          />
        </Link>
      </div>
      <div className="ms-4 mt-2">
        <Link
          to={{
            pathname: "/author",
            search: `?data=${encodeURIComponent(
              JSON.stringify({
                author: author,
              })
            )}`,
          }}
        >
          <div className="hover:text-blue-400 hover:underline font-bold text-xl">
            {author.aname}
          </div>
        </Link>
        <div className="text-gray-400 text-sm max-w-sm font-normal">
          {author.adescription.slice(0, 90)}...
        </div>
      </div>
    </div>
  );
}

export default AuthorCard;
