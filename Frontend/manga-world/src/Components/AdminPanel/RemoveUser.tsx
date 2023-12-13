import { useEffect, useState } from "react";
import Manga from "../../Model/Manga";
import VolumeController from "../../Controller/VolumeController";
import User from "../../Model/User";
import UserController from "../../Controller/UserController";

function RemoveUser() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    setFilteredUserList(usersList);
  }, [usersList]);

  useEffect(() => {
    const isValid = !!selectedUser;

    setIsSubmitDisabled(!isValid);
  }, [selectedUser]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersList([]);
    setSelectedUser(null);
    const searchTerm = e.target.value.toLowerCase();
    setSearchInputValue(e.target.value);
    if (searchTerm.length > 0) {
      UserController.searchByName(searchTerm).then((response) => {
        setUsersList(response.data);
        let tempUsersList: User[] = response.data;
        const filteredUser = tempUsersList.filter((user) =>
          user.name.toLowerCase().includes(searchTerm)
        );
        setFilteredUserList(filteredUser);

        setIsSearchFocused(!!searchTerm);
      });
    }
  };

  const handleUserSelect = (user: string) => {
    setSelectedUser(usersList.find((m) => m.name === user) || null);
    setIsSearchFocused(false);
    setSearchInputValue(user);
  };

  const clearForm = () => {
    setSelectedUser(null);
    setIsSubmitDisabled(true);
  };

  const handleSubmit = () => {
    if (selectedUser) {
      UserController.deleteUser(selectedUser.userId).then((res) => {
        setSuccessMessage(`Successfully deleted ${selectedUser.name}`);
        setUsersList([]);
        clearForm();
      });
    }
  };

  return (
    <div className="w-1/3 mt-8 p-6 bg-black bg-opacity-50 rounded">
      <h2 className="text-xl font-semibold mb-4 text-white">Remove A User</h2>

      <div className="mb-4">
        <label
          htmlFor="searchManga"
          className="block text-white text-sm font-medium"
        >
          Search User
        </label>
        <input
          type="text"
          id="searchManga"
          placeholder="Search Manga"
          onChange={(e) => handleSearchChange(e)}
          onFocus={() => setIsSearchFocused(true)}
          value={isSearchFocused ? searchInputValue : selectedUser?.name || ""}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="w-full bg-gray-500 rounded">
          {isSearchFocused && filteredUserList.length > 0 && (
            <div className="search-results p-1">
              {filteredUserList.map((user, index) => (
                <div
                  key={index}
                  className="cursor-pointer bg-black bg-opacity-70 mt-1 text-white hover:bg-black p-2 rounded"
                  onMouseDown={() => handleUserSelect(user.name)}
                >
                  {user.name} [{user.email}]
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        className={`w-full p-2 mt-2 bg-red-700 hover:bg-red-800 text-white rounded ${
          isSubmitDisabled && "opacity-50 cursor-not-allowed  hover:bg-red-700"
        }`}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Delete
      </button>

      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
    </div>
  );
}

export default RemoveUser;
