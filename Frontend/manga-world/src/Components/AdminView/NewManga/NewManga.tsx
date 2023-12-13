import React, { useEffect, useRef, useState } from "react";
import Author from "../../../Model/Author";
import Publisher from "../../../Model/Publisher";
import Category from "../../../Model/Category";
import AuthorController from "../../../Controller/AuthorController";
import PublisherController from "../../../Controller/PublisherController";
import CategoryController from "../../../Controller/CategoryController";
import MangaController from "../../../Controller/MangaController";
import MangaPictureController from "../../../Controller/MangaPictureController";
import AuthorMangaController from "../../../Controller/AuthorMangaController";
import CategoryMangaController from "../../../Controller/CategoryMangaController";
import PublisherMangaController from "../../../Controller/PublisherMangaController";

enum MangaStatus {
  Ongoing = "ongoing",
  Completed = "completed",
}

function NewManga() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<MangaStatus>(MangaStatus.Ongoing);
  const [publishDate, setPublishDate] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<string | undefined>();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [addedAuthors, setAddedAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addedCategories, setAddedCategories] = useState<Category[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "status":
        setStatus(value as MangaStatus);
        break;
      case "publishDate":
        setPublishDate(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tempSelectedAuthor = authors.find(
      (author) => author.aid === parseInt(e.target.value)
    );

    if (tempSelectedAuthor && !addedAuthors.includes(tempSelectedAuthor)) {
      setSelectedAuthor(tempSelectedAuthor.aid.toString());
    }
  };

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tempSelectedCategory = categories.find(
      (category) => category.cid === parseInt(e.target.value)
    );

    if (
      tempSelectedCategory &&
      !addedCategories.includes(tempSelectedCategory)
    ) {
      setSelectedCategory(tempSelectedCategory.cid.toString());
    }
  };

  const handleAddAuthor = () => {
    let tempSelectedAuthor = authors.find(
      (author) => author.aid === parseInt(selectedAuthor)
    );
    if (
      tempSelectedAuthor &&
      selectedAuthor &&
      !addedAuthors.includes(tempSelectedAuthor)
    ) {
      let tempAuthors: Author[] = authors;
      tempAuthors.splice(authors.indexOf(tempSelectedAuthor), 1);
      setAuthors(tempAuthors);
      setAddedAuthors([...addedAuthors, tempSelectedAuthor]);
      setSelectedAuthor("");
    }
  };

  const handleAddCategory = () => {
    let tempSelectedCategory = categories.find(
      (category) => category.cid === parseInt(selectedCategory)
    );
    if (
      tempSelectedCategory &&
      selectedCategory &&
      !addedCategories.includes(tempSelectedCategory)
    ) {
      let tempCategories: Category[] = categories;
      tempCategories.splice(categories.indexOf(tempSelectedCategory), 1);
      setCategories(tempCategories);
      setAddedCategories([...addedCategories, tempSelectedCategory]);
      setSelectedCategory("");
    }
  };

  const handleDeleteAuthor = (author: Author) => {
    setAuthors([...authors, author]);
    setAddedAuthors(addedAuthors.filter((a) => a !== author));
  };

  const handleDeleteCategory = (category: Category) => {
    setCategories([...categories, category]);
    setAddedCategories(addedCategories.filter((c) => c !== category));
  };

  const handlePublishersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPublisher(e.target.value);
  };

  useEffect(() => {
    AuthorController.getAllAuthors().then((res) => {
      setAuthors(res.data);
    });
    PublisherController.getAllPublishers().then((res) => {
      setPublishers(res.data);
    });
    CategoryController.allCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleSubmit = () => {
    let tempManga = {
      mtitle: title,
      mstatus: status,
      mpublishDate: publishDate,
      mdescription: description,
    };
    MangaController.addNewManga(tempManga).then((resManga) => {
      let returnedManga = resManga.data;
      if (picture) {
        let tempMangaPicture = {
          mpPicture: picture,
          manga: returnedManga,
        };
        MangaPictureController.addNewPicture(tempMangaPicture).then(
          (resPicture) => {
            if (fileInputRef.current) {
              (fileInputRef.current as any).value = "";
            }
          }
        );
      }
      addedAuthors.forEach((author) => {
        let tempAuthorManga = {
          aid: author.aid,
          mid: returnedManga.mid,
        };
        AuthorMangaController.addAuthorManga(tempAuthorManga).then((res) => {});
      });
      addedCategories.forEach((category) => {
        let tempCategoryManga = {
          cid: category.cid,
          mid: returnedManga.mid,
        };
        CategoryMangaController.addCategoryManga(tempCategoryManga).then(
          (res) => {}
        );
      });
      let tempPublisherManga = {
        pid: parseInt(selectedPublisher),
        mid: returnedManga.mid,
      };
      PublisherMangaController.addPublisherManga(tempPublisherManga).then(
        (res) => {}
      );
    });

    setTitle("");
    setStatus(MangaStatus.Ongoing);
    setPublishDate("");
    setDescription("");
    setPicture(undefined);
    setAuthors([]);
    setSelectedAuthor("");
    setPublishers([]);
    setSelectedPublisher("");
    setCategories([]);
    setSelectedCategory("");
    setAddedCategories([]);
    setAddedAuthors([]);
    setSuccessMessage("Chapter added successfully!");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <div className="w-1/3 mt-8 p-6 bg-black bg-opacity-50 rounded">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Manga</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-white">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-white text-sm font-medium"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value={MangaStatus.Ongoing}>{MangaStatus.Ongoing}</option>
          <option value={MangaStatus.Completed}>{MangaStatus.Completed}</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="publishDate"
          className="block text-sm font-medium text-white"
        >
          Publish Date
        </label>
        <input
          type="date"
          id="publishDate"
          name="publishDate"
          value={publishDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded resize-none"
          rows={10}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="picture"
          className="block text-sm font-medium text-white"
        >
          Picture
        </label>
        <input
          type="file"
          id="picture"
          accept="image/*"
          onChange={handlePictureChange}
          className="block mt-1 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          ref={fileInputRef}
        />
        {picture && (
          <div className="mt-4">
            <img
              src={picture}
              alt="Selected"
              className="w-full border-2 border-white rounded-xl"
            />
          </div>
        )}
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="authors"
          className="w-full text-sm font-medium text-white"
        >
          Authors
        </label>
        <div className="flex items-center">
          <select
            id="authors"
            name="authors"
            value={selectedAuthor || ""}
            onChange={handleAuthorChange}
            className="w-full p-2 border rounded mr-2"
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.aid} value={author.aid}>
                {author.aname}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddAuthor}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 ease-in-out"
          >
            Add
          </button>
        </div>
        {addedAuthors.map((author) => (
          <div
            key={author.aid}
            className="flex items-center justify-between bg-red-950 bg-opacity-50 text-white mt-2"
          >
            <span className="mr-2">{author.aname}</span>
            <button
              onClick={() => handleDeleteAuthor(author)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="publishers"
          className="w-full text-sm font-medium text-white"
        >
          Publishers
        </label>
        <div className="items-center w-full">
          <select
            id="publishers"
            name="publishers"
            value={selectedPublisher || ""}
            onChange={handlePublishersChange}
            className="w-full p-2 border rounded mr-2"
          >
            <option value="">Select a publisher</option>
            {publishers.map((publisher) => (
              <option key={publisher.pid} value={publisher.pid}>
                {publisher.pname}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="categories"
          className="w-full text-sm font-medium text-white"
        >
          Categories
        </label>
        <div className="flex items-center">
          <select
            id="categories"
            name="categories"
            value={selectedCategory || ""}
            onChange={handleCategoriesChange}
            className="w-full p-2 border rounded mr-2"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.cid} value={category.cid}>
                {category.cname}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddCategory}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 ease-in-out"
          >
            Add
          </button>
        </div>
        {addedCategories.map((category) => (
          <div
            key={category.cid}
            className="flex items-center justify-between bg-red-950 bg-opacity-50 text-white mt-2"
          >
            <span className="mr-2">{category.cname}</span>
            <button
              onClick={() => handleDeleteCategory(category)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className={`w-full p-2 bg-blue-500 text-white rounded ${
          !title ||
          !status ||
          !publishDate ||
          !description ||
          addedAuthors.length === 0 ||
          addedCategories.length === 0 ||
          !selectedPublisher
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        disabled={
          !title ||
          !status ||
          !publishDate ||
          !description ||
          addedAuthors.length === 0 ||
          addedCategories.length === 0 ||
          !selectedPublisher
        }
      >
        Submit
      </button>
      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
    </div>
  );
}

export default NewManga;
