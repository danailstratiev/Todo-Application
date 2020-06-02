import {usersCreateLink_Click} from "../../events/events"

export default function usersPage() {
    return { template :`
    <div class="usersTable">
        <table>
        <thead>
            <tr>
                <td></td>
                <td>Username</td>
                <td>Password</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Is admin</td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody class="users-management">
            
        </tbody>
    </table>
    </div>
    <div class="functional-button">
        <button id="newUserLink" >Register New User</button>
    </div>
    `,
    listeners: [
        {
            targetId: 'newUserLink',
            eventType: 'click',
            callback: usersCreateLink_Click
        }
    ]

    };

}

// {/* k */}