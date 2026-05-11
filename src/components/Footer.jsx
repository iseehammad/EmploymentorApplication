function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 px-8 py-6 mt-auto">

      <div className="flex justify-between items-center">

        <p className="text-sm">
          &copy; 2026 JobPortal. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Services</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>

      </div>

    </footer>
  )
}

export default Footer