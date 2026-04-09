export default function Footer() {
  return (
    <footer className="px-6 py-10">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-semibold ">MediCare</h2>
          <p className="mt-3 text-sm">
            Connecting patients with trusted doctors. Book appointments easily and manage your health.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-green-500">Home</a></li>
            <li><a href="/doctors" className="hover:text-green-500">Doctors</a></li>
            <li><a href="/appointments" className="hover:text-green-500">Appointments</a></li>
            <li><a href="/contact" className="hover:text-green-500">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-medium mb-3">Contact</h3>
          <p className="text-sm">Email: support@medicare.com</p>
          <p className="text-sm mt-1">Phone: +91 98765 43210</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Pranoy. All rights reserved.
      </div>
    </footer>
  );
}