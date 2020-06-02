export default function shareListUsersPage() {
    return { template :`
    <div class="shareusers-nav">
        <table>
        <thead>
            <tr>
                <td>Username</td>
                <td>First name</td>
                <td>Last name</td>
                <td></td>
            </tr>
        </thead>
        <tbody class="usersToShare">
            
        </tbody>
    </table>
    </div>
   `,
   listeners: [
    
    ]};
}