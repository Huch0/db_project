import Link from "next/link";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <div className="flex items-center justify-between py-6 px-4 bg-blue-400 text-white shadow-md">
          <div className="flex items-center space-x-2">
            <Link
              href="/main"
              className="text-2xl font-bold hover:text-blue-200 transition duration-200"
            >
              UniConnect
            </Link>
          </div>
          <div className="flex items-center">
            <img
              className="rounded-full h-16 w-16 ml-4 border-2 border-blue-300"
              src="/images/Siberian Huski profile img.jpg"
            />
          </div>
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
