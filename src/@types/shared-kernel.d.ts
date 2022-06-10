type Email = string;
type UniqueId = number;
type DateTimeString = string;

type HTTP_SUCCESS = 200;
type HTTP_CREATED = 201;
type HTTP_NO_CONTENT = 204;
type HTTP_MOVED_PERMANENTLY = 301;
type HTTP_BAD_REQUEST = 400;
type HTTP_UNAUTHORIZED = 401;
type HTTP_FORBIDDEN = 403;
type HTTP_NOT_FOUND = 404;
type HTTP_METHOD_NOT_ALLOWED = 405;
type HTTP_INTERNAL_SERVER_ERROR = 500;

type HTTP_CODES =
  | HTTP_SUCCESS
  | HTTP_CREATED
  | HTTP_NO_CONTENT
  | HTTP_MOVED_PERMANENTLY
  | HTTP_BAD_REQUEST
  | HTTP_UNAUTHORIZED
  | HTTP_FORBIDDEN
  | HTTP_NOT_FOUND
  | HTTP_METHOD_NOT_ALLOWED
  | HTTP_INTERNAL_SERVER_ERROR;
