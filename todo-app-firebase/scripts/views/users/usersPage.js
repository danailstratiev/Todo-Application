function usersPage() {
    return `
    
    <div class="usersTable">
        <nav>
        <ul>
            <li></li>
            <li>Username</li>
            <li>Password</li>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Is admin</li>
            <li></li>
            <li></li>
        </ul>
        </nav>
    </div>
    <div class="functional-button">
        <button id="newUserLink" onclick="usersCreateLink_Click()">Register New User</button>
    </div>
    `;

}