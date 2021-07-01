import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import './AdminSideNav.css'

function adminSideNav(props) {

  console.log(props.user)
  return (
    <div>
      {props.user && props.user.type == "ADMIN" ? <div className="sideSection">
        <Navigation
          className="select-nav"
          activeItemId={window.location.pathname}
          onSelect={({ itemId }) => {
            console.log(itemId)
            if (itemId == '/sign') {
              localStorage.removeItem('user');
              window.location.href = '/'
            }
            else
              window.location.href = itemId
          }}
          items={[
            {
              title: "Dashboard",
              itemId: "/admin/dashboard"
              // Optional
              //   elemBefore: () => <Icon name="coffee" />
            },
            {
              title: "Submission",
              itemId: "/submission",
              //   elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "Add Submission Topic",
                  itemId: "/submission/add",
                  // Optional
                  //   elemBefore: () => <Icon name="cloud-snow" />
                }
              ]
            },
            {
              title: "Conference",
              itemId: "/conferences",
              subNav: [
                {
                  title: "Add Conference",
                  itemId: "/conference/add"
                }
              ]
            },
            {
              title: "Workshop",
              itemId: "/workshops",
              subNav: [
                {
                  title: "Add Workshop",
                  itemId: "/workshop/add"
                }
              ]
            },
            {
              title: "Add Template",
              itemId: "/template/upload"
            },
            props.user != null ? {
              title: "Sign Out",
              itemId: "/sign"
            } :
              {
                title: "Login",
                itemId: "/signIn"
              }
          ]}
        />
      </div> : null}

    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user ? state.user.user : null
})

export default connect(mapStateToProps, null)(adminSideNav)