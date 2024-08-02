export function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="mx-auto my-10 px-4">
      <p className="border-t pt-4 text-center text-xs leading-5 text-gray-700">
        &copy; {date} ShoeBillal. All Rights Reserved.
      </p>
    </footer>
  );
}
