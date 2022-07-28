import { JsonController, Param, Body, Get, Post } from "routing-controllers";

@JsonController()
export class UserController {
  @Get("/users")
  getAll() {
    return "This action returns all users";
  }

  // @Get("/users/:id")
  // getOne(@Param("id") id: number) {
  //   return "This action returns all users";
  // }

  // @Post("/users")
  // post(@Body() userBody: string) {
  //   return "This action returns all users";
  // }
}
