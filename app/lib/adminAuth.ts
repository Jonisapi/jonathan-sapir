export function isAdminRequest(request: Request) {
  return request.headers.get('x-admin-passcode') === (process.env.ADMIN_PASSCODE ?? '8888');
}
