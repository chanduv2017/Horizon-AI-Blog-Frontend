import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: string;
}) {
  const Navigate = useNavigate();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className={`relative inline-flex items-center justify-center ${
            size == "small" ? "w-6 h-6" : "w-10 h-10"
          } overflow-hidden rounded-full bg-gray-600`}
        >
          <span
            className={`${
              size == "small" ? "text-xs" : "text-md"
            } font-extralight  text-gray-300 `}
          >
            {name[0]}
          </span>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={() => Navigate("/profile")}
            >
              Profile
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={() => Navigate("/my-blogs")}
            >
              My Blogs
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={() => {
                localStorage.removeItem("token");
                Navigate("/signin");
              }}
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
