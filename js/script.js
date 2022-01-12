const url = 'https://reqres.in/api/users/'
// Skapar eventlisteners som andänvds för modalen som justerar css för att visa/dölja.
const userModal = document.querySelector('.modal')
const bodyBlackout = document.querySelector('.bodyBlackout')

bodyBlackout.addEventListener('click', () => {
    bodyBlackout.classList.remove('bodyBlackoutActive');
    userModal.classList.add('modalClosed')
    userModal.classList.remove('modalOpen')
})
// Här hämtas alla användare och skriver ut dem i separata div:ar som alla har ett eget onclick event för att
// öppna modalen med rätt information.
function getAllUsers(url){
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const users = data.data;
            let output = '';
            users.forEach(user => {
                output += `
                    <div id="${user.id}" class="user" onclick="getUser(url, ${user.id})">
                        <div>
                            <img src="${user.avatar}" alt="">
                        </div>
                        <div>
                            <h2>${user.first_name} ${user.last_name}</h2>
                        </div>
                    </div>
                `;
            });
            document.getElementById('output').innerHTML = output;
        });
}
// Denna funktion körs när man klickar på en användare och skickar då ett anrop mot api:t så endast informationen för
// rätt användare  och läggs in i modalen.
function getUser(url, userId){
    fetch(url+userId)
        .then((res) => res.json())
        .then((data) => {
            const user = data.data;
            document.getElementById('userModal').innerHTML = `
                <div id="user${user.id}" class="user">
                    <div>
                        <img src="${user.avatar}" alt="">
                    </div>
                    <div>
                        <h2>${user.first_name} ${user.last_name}</h2>
                        <h2>Email: ${user.email}</h2>
                    </div>
                </div>
            `;
        })
        .then(() => {
            userModal.classList.remove('modalClosed')
            userModal.classList.add('modalOpen')
            bodyBlackout.classList.add('bodyBlackoutActive')
        })
    ;
}
getAllUsers(url);