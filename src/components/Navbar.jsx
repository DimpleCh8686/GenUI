import React, { useContext, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { HiSun, HiMoon } from 'react-icons/hi'
import { RiSettings3Fill } from 'react-icons/ri'
import { ThemeContext } from '../context/ThemeContext'
import { UserContext } from '../context/UserContext'
import { users } from '../data/users'

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, login, logout } = useContext(UserContext);

  const [showProfile, setShowProfile] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [email, setEmail] = useState("");

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    college: "",
    branch: "",
    company: ""
  });

  // LOGIN
  const handleLogin = () => {
    const foundUser = users.find(u => u.email === email);

    if (foundUser) {
      login(foundUser);
      setEditData(foundUser);
      setShowLoginModal(false);
      setShowProfile(true);
    } else {
      alert("User not found");
    }
  };

  // SAVE
  const handleSave = () => {
    login(editData);
    localStorage.setItem("user", JSON.stringify(editData));
    alert("Profile updated!");
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b bg-white dark:bg-[#0f0f0f] text-black dark:text-white">

        <h3 className='text-[25px] font-bold sp-text'>GenUI</h3>

        <div className="flex items-center gap-[15px]">

          {/* THEME */}
          <div 
            onClick={toggleTheme}
            className="p-4 text-[24px] rounded-xl cursor-pointer bg-gray-200 dark:bg-[#141319]"
          >
            {theme === "dark" ? <HiSun /> : <HiMoon />}
          </div>

          {/* USER */}
          <div 
            className="p-4 text-[24px] rounded-xl cursor-pointer bg-gray-200 dark:bg-[#141319]"
            onClick={() => {
              if (!user) setShowLoginModal(true);
              else setShowProfile(true);
            }}
          >
            {user ? user.name?.[0]?.toUpperCase() : <FaUser />}
          </div>

          {/* SETTINGS */}
          <div 
            className="p-4 text-[24px] rounded-xl cursor-pointer bg-gray-200 dark:bg-[#141319]"
            onClick={() => setShowSettings(true)}
          >
            <RiSettings3Fill />
          </div>

        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

          <div className="bg-white dark:bg-[#141319] p-6 rounded-xl w-[300px]">

            <h2 className="mb-3 font-semibold">Enter Email</h2>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-[#0f0f0f]"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button 
              onClick={handleLogin}
              className="w-full bg-purple-500 text-white py-2 rounded"
            >
              Login
            </button>

          </div>
        </div>
      )}

      {/* PROFILE MODAL */}
      {showProfile && user && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

          <div className="bg-white dark:bg-[#141319] text-black dark:text-white p-6 rounded-2xl w-[420px] relative shadow-lg">

            {/* CLOSE */}
            <button
              className="absolute top-2 right-3 text-xl"
              onClick={() => setShowProfile(false)}
            >
              ✖
            </button>

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="space-y-3">

              {Object.entries(user).map(([key, value]) => {
                if (key === "password") return null;

                return (
                  <div
                    key={key}
                    className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
                  >
                    <span className="capitalize text-gray-600 dark:text-gray-400">
                      {key}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                );
              })}

            </div>

            {/* LOGOUT */}
            <button
              onClick={() => {
                logout();
                setShowProfile(false);
              }}
              className="mt-5 w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>

          </div>
        </div>
      )}

      {/* SETTINGS PANEL */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">

          <div className="w-[500px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#141319] rounded-2xl shadow-xl p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Settings</h2>
              <button
                className="text-xl hover:scale-110 transition"
                onClick={() => setShowSettings(false)}
              >
                ✖
              </button>
            </div>

            {/* SECTION: APPEARANCE */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                Appearance
              </h3>

              <div className="flex items-center justify-between bg-gray-100 dark:bg-[#1c1c22] p-3 rounded-xl">
                <span>Dark Mode</span>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-1 bg-purple-500 text-white rounded-lg text-sm"
                >
                  Toggle
                </button>
              </div>
            </div>

            {/* SECTION: PROFILE */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                Profile
              </h3>

              <div className="space-y-3">

                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-[#1c1c22]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-[#1c1c22]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Password</label>
                  <input
                    type="password"
                    value={editData.password}
                    onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                    className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-[#1c1c22]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Role</label>
                  <input
                    value={editData.role}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-[#1c1c22]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">College</label>
                  <input
                    value={editData.college}
                    onChange={(e) => setEditData({ ...editData, college: e.target.value })}
                    className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-[#1c1c22]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Branch</label>
                  <input
                    value={editData.branch}
                    onChange={(e) => setEditData({ ...editData, branch: e.target.value })}
                    className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-[#1c1c22]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Company</label>
                  <input
                    value={editData.company}
                    onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                    className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-[#1c1c22]"
                  />
                </div>

              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={handleSave}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              >
                Save Changes
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowSettings(false);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Navbar