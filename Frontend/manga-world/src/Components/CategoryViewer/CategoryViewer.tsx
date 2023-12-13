import "./../Homepage/Homepage.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Auth } from "../../Auth/Auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Category from "../../Model/Category";
import Pagination from "../Utility/Pagination";
import Subpage from "../Utility/Subpage";
import MangaController from "../../Controller/MangaController";
import CategoryController from "../../Controller/CategoryController";

function CategoryViewer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jsonString = searchParams.get("data") || "";
  const { authorised, userId, userType } = useContext(Auth);
  let navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [catagories, setCatagories] = useState<Category[]>([]);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    CategoryController.allCategories().then((res) => {
      setCatagories(res.data);
    });
  }, []);

  useEffect(() => {
    if (jsonString === "") {
      navigate("/home");
      return;
    }
    const data = JSON.parse(decodeURIComponent(jsonString));
    const selectedCategoryTemp: Category = data.category;
    setSelectedCategory(selectedCategoryTemp);
  }, [jsonString]);

  return (
    <div className="background_image_home ">
      {selectedCategory && (
        <div className="flex">
          <div className="bg-black bg-opacity-75">
            {catagories.map((category) => (
              <div
                onClick={() => {
                  setSelectedCategory(category);
                  if (topRef.current) {
                    topRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                key={category.cid}
                className="text-white block mt-1 p-2 font-bold bg-black bg-opacity-10 hover:bg-opacity-75 hover:rounded hover:cursor-pointer hover:m-1 hover:scale-110 transition-transform duration-300 ease-in-out"
              >
                {category.cname}
              </div>
            ))}
          </div>

          <div className="flex-grow bg-black bg-opacity-75 min-h-screen">
            <div className="text-white text-center font-bold text-4xl p-4">
              {selectedCategory.cname} Manga
            </div>
            <div>
              <div>
                <Subpage
                  fetchMangaData={MangaController.getMostViewedBasedOnCategory}
                  fetchMangaPageNumber={
                    MangaController.getMostViewedCountBasedOnCategory
                  }
                  element={selectedCategory}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryViewer;
