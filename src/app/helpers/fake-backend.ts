import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Photo } from '../models/photo';
import { User } from '../models/user';
import { ChatRoom } from '../models/chatroom';
import { ChatMessage } from '../models/chatmessage';
 
export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    let photos : Photo[] = [];
    let localPhoto : Photo = new Photo();
    localPhoto.id = 1;
    localPhoto.url = 'https://www.scandichotels.com/imagevault/publishedmedia/xkaq3p1plwnad4vbncw8/4588752-bergen-at-night_by_Buckley.jpg';
    localPhoto.description = 'first photo';
    let localPhoto2: Photo = new Photo();
    localPhoto2.id = 2;
    localPhoto2.url = 'http://fjordtours.blob.core.windows.net/fjordtours-umbraco/1178/bryggen-girish-chouhan-visitbergen_com.jpg';
    localPhoto2.description = 'Second photo';
    photos.push(localPhoto);
    photos.push(localPhoto2);

    let user: User = new User();
    user.firstName = "Kurt";
    user.lastName = "Rogiers";
    user.avatarUrl = "http://www.philippedraps.be/wp-content/uploads/2015/10/kurt-rogiers-close.png";
    user.id = 123;
    let user2: User = new User();
    user2.firstName = "Thomas";
    user2.lastName = "Van Cleemput";
    user2.avatarUrl = "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/8/005/049/301/1b54688.jpg";
    user2.id = 1;
    let user3: User = new User();
    user3.firstName = "Bart";
    user3.lastName = "Vercruysse";
    user3.avatarUrl = "http://ppw.kuleuven.be/clep/images/bart-simpson.jpg";
    user3.id = 3;
    
    let chatMessage1 : ChatMessage = new ChatMessage();
    chatMessage1.message = "message 1"
    chatMessage1.user = user;
    let chatMessage2 : ChatMessage = new ChatMessage();
    chatMessage2.message = "message 2"
    chatMessage2.user = user2;
    let chatMessage3 : ChatMessage = new ChatMessage();
    chatMessage3.message = "message 3"
    chatMessage3.user = user;
    let chatMessage4 : ChatMessage = new ChatMessage();
    chatMessage4.message = "message 4"
    chatMessage4.user = user3;
    let localChatRoom : ChatRoom = new ChatRoom();
    localChatRoom.chatroomId = 1;
    localChatRoom.name = "My first chatroom";
    localChatRoom.messages = [chatMessage1, chatMessage2, chatMessage3, chatMessage4];
    localChatRoom.participants = [user, user2, user3];

    let chatrooms : ChatRoom[] = [localChatRoom];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
 
            // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());
 
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });
 
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('Username or password is incorrect'));
                }
 
                return;
            }
 
            // get users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
 
                return;
            }
 
            // get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;
 
                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
 
                return;
            }

            // update user by id
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Put) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;
 
                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
 
                return;
            }

            // get user by id
            if (connection.request.url.match(/\/api\/users\/isProfileComplete\/\d+$/) && connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: false })));
                return;
            }
 
            // create user
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newUser = JSON.parse(connection.request.getBody());
 
                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                }
 
                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
 
                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
 
                return;
            }
 
            // delete user
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }
 
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
 
                return;
            }

            // get photos
            if (connection.request.url.endsWith('/api/photos') && connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: photos })));
                return;
            }

            if (connection.request.url.startsWith('/api/photos') && connection.request.method === RequestMethod.Put) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: photos })));
                return;
            }

            // get chatrooms
            if (connection.request.url.startsWith('/api/chatroom/byUserId') && connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: chatrooms })));
                return;
            }

            if (connection.request.url.startsWith('/api/chatroom') && connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: localChatRoom })));
                return;
            }

            if (connection.request.url.startsWith('/api/chatroom') && connection.request.method === RequestMethod.Post) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: localChatRoom })));
                return;
            }
 
            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });
 
        }, 500);
 
    });
 
    return new Http(backend, options);
};
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};