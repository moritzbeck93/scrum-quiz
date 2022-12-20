import Navigation from "./navigation/navigation";

function Layout(props: any) {
    return (
      <>
        <Navigation />
        <main>{props.children}</main>
      </>
    )
  }

export default Layout;