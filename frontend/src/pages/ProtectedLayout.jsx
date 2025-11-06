import NavBar from "./NavBar";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
