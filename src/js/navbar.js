class Navbar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <!-- Your navigation bar code goes here -->
        <nav>
          <ul>
            <li><a href="home.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
      `;
    }
  }
customElements.define('navbar-component', Navbar);
