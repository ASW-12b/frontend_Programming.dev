export function getTokenAndUser() {
        const token = localStorage.getItem('token');
        const selectedUser = localStorage.getItem('selectedUser');
        return { token, selectedUser };
}
