import React from 'react'

const MainHeader = ({ menudata }) => {

  const renderMenuItems = (items) => {
    if (!items || !Array.isArray(items)) {
      return null;
    }
    return items.map((item) => (
      <li key={item.id} className={item.children ? 'menu-item-has-children' : 'menu-item'}>
        <a href={item.url}>{item.label}</a>
        {item.children && (
          <ul className="sub-menu">
            {item.children.map((child) => (
              <li key={child.id} className={child.subchildren ? 'menu-item-has-children' : 'menu-item'}>
                <a href={child.url}>{child.label}</a>
                <ul className="sub-menu">
                  {child.subchildren && renderMenuItems(child.subchildren)}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <>
      <header className="header-one">
        <div className="top-bar">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <ul className="login">
                  <li>
                    <a href="tel:033 - 4006 1156">
                      <i className="fa fa-phone" />
                      &nbsp;&nbsp;033 - 4006 1156
                    </a>
                  </li>
                  <li>
                    <a href="mailto:loretosa.sec@gmail.com">
                      <i className="fa fa-envelope" />
                      &nbsp;&nbsp;loretosa.sec@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 offset-1">
                <ul className="social-medias">
                  <li>
                    <a href="JavaScript:void(0)">
                      <img src="assets/images/facebook.svg" alt="facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="JavaScript:void(0)">
                      <img src="assets/images/twitter.svg" alt="twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="JavaScript:void(0)">
                      <img src="assets/images/instagram.svg" alt="instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="desktop-nav" id="stickyHeader">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav>
                  <div className="logo">
                    <a href="index.html">
                      <img src="assets/images/home/headlogo.png" alt="Logo" />
                    </a>
                  </div>
                  <div className="nav-bar">
                    <ul>
                      {renderMenuItems(menudata)}
                    </ul>
                  </div>
                  <div className="donation">
                    <a
                      href="JavaScript:void(0)"
                      className="theme-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Contact Us
                    </a>
                  </div>
                  <div id="nav-icon4">
                    <span />
                    <span />
                    <span />
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

    </>
  )
}

export default MainHeader
