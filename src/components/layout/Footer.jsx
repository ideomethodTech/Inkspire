import { Headline } from "../typography";

export default function Footer() {
  return (
    <footer className="bg-[#1f2226] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-5 gap-12">

        {/* Newsletter */}
        <div className="md:col-span-2">
          <Headline className=" mb-4">STAY INSPIRED</Headline>
          <p className="text-sm text-gray-300 mb-6">
            Join our wall art club & get 20% off your first order.
          </p>

  <div className="border-b border-gray-500 pb-2 mb-6">
  <input
    type="email"
    placeholder="Email*"
    className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
  />
</div>

<div className="flex items-center justify-between">
  {/* Subscribe text */}
  <div className="flex items-center gap-3">
    <input type="checkbox" />
    <span className="text-sm text-gray-300">
      Subscribe to our newsletter
    </span>
  </div>

  {/* Submit button */}
  <button className="bg-white text-black px-6 py-2 rounded-md text-sm">
    Submit
  </button>
</div>


          <p className="text-xs text-white mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-sm font-semibold mb-4">SHOP</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>All</li>
            <li>Categories</li>
            <li>Rooms</li>
            <li>Collections</li>
            <li>Custom Posters</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-sm font-semibold mb-4">INFORMATION</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Shipping & Returns</li>
            <li>Track Order</li>
          </ul>
        </div>
          {/* Information */}
        <div>
          <h3 className="text-sm font-semibold mb-4">FOLLOW US</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Instagram</li>
            <li>Facebook</li>            
          </ul>
        </div>
      </div>

     {/* Bottom bar */}

  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

    {/* Left: Brand */}
    <div className="flex items-center gap-2">
     
      <h2 className="text-6xl font-medium text-white">
        inkspire
      </h2>
       <span className="w-3 h-3 bg-red-500 rounded-full relative top-[12px]" />
    </div>

    {/* Right: Copyright */}
    <div className="flex flex-col">
    <span className="text-xs text-gray-400 text-center md:text-right">
      © INKSPIRES (INDIA). All rights reserved
    </span>
      <span className="mt-3 md:mt-0">PayPal · VISA</span>
</div>
  </div>


    </footer>
  );
}
