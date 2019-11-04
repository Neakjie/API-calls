import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(
  backend: MockBackend,
  options: BaseRequestOptions) {

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhIFdhbmciLCJpYXQiOjE1MTYyMzkwMjIsImFkbWluIjp0cnVlfQ.Y7pz7ZB25df4bFzYLuNLU0p5ax9vvo8pUzAasEYh2uI';

  // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhIFdhbmciLCJhZG1pbiI6ZmFsc2V9.B8Naw01xC7wODwpFWYu6W8buOce0HFuHCXXeovHYoNE';

  backend.connections.subscribe((connection: MockConnection) => {
    // We are using the setTimeout() function to simulate an 
    // asynchronous call to the server that takes 1 second. 
    setTimeout(() => {
      //
      // Fake implementation of /api/authenticate
      //
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());

        if (body.email === 'fw4hfw4h@gmail.com' && body.password === '1234') {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
            })));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200 })
          ));
        }
      }



      // 
      // Fake implementation of /api/orders
      //
      if (connection.request.url.endsWith('/api/orders') &&
        connection.request.method === RequestMethod.Get) {
        if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: [1, 2, 3] })
          ));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 401 })
          ));
        }
      }



    }, 1000);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions]
};