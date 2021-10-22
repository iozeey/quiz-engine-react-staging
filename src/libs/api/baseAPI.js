class BaseAPI {
  constructor(props) {
    this.props = props;
  }

  makeHeader = () => {
    return new Headers({
      Authorization: `Token ${window.location.pathname.split("/")[2]}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    });
  };
  fetchSecure = ({ url }) => {
    return fetch(url, {
      method: "GET",
      headers: this.makeHeader(),
    });
  };

  postSecure = ({ url, data }) => {
    return fetch(url, {
      method: "POST",
      headers: this.makeHeader(),
      body: JSON.stringify({ ...data }),
    });
  };
}

export default BaseAPI;
