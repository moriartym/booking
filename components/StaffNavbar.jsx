import Link from "next/link";

const StaffNavbar = ({ text1, text2 }) => {
  return (
    <header className="bg-black p-6">
      <nav className="flex items-center justify-between pr-32 pl-32">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-white text-lg font-semibold mr-12 cursor-pointer">
              BookNow
            </div>
          </Link>
          <ul className="flex">
            <li className="mr-6">
              <Link href="/staffBooking">
                <div className="text-white cursor-pointer">{text1}</div>
              </Link>
            </li>
            <li>
              <Link href="/staffManage">
                <div className="text-white cursor-pointer">{text2}</div>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link href="/">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded">
              Log Out
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default StaffNavbar;
