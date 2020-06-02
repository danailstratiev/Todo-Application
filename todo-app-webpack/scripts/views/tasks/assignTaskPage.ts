export default function assignTaskPage() {
    return { template: `
    <table class="assign-table">
        <thead>
            <tr>
                <td>Username</td>
                <td>First name</td>
                <td>Last name</td>
                <td>IsAdmin</td>
                <td></td>
            </tr>
        </thead>
        <tbody class="assignedUsers">
            <tr></tr>
        </tbody>
    </table>    
    `,
    listeners: [
        
    ]};
}