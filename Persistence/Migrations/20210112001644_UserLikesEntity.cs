using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UserLikesEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAdvertiseFavorite");

            migrationBuilder.CreateTable(
                name: "UserFavorites",
                columns: table => new
                {
                    AdvertiseId = table.Column<int>(type: "integer", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFavorites", x => new { x.AdvertiseId, x.AppUserId });
                    table.ForeignKey(
                        name: "FK_UserFavorites_Advertise_AdvertiseId",
                        column: x => x.AdvertiseId,
                        principalTable: "Advertise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFavorites_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLikes",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    AdvertiseId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLikes", x => new { x.AdvertiseId, x.AppUserId });
                    table.ForeignKey(
                        name: "FK_UserLikes_Advertise_AdvertiseId",
                        column: x => x.AdvertiseId,
                        principalTable: "Advertise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserLikes_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserFavorites_AppUserId",
                table: "UserFavorites",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLikes_AppUserId",
                table: "UserLikes",
                column: "AppUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserFavorites");

            migrationBuilder.DropTable(
                name: "UserLikes");

            migrationBuilder.CreateTable(
                name: "UserAdvertiseFavorite",
                columns: table => new
                {
                    AdvertiseId = table.Column<int>(type: "integer", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAdvertiseFavorite", x => new { x.AdvertiseId, x.AppUserId });
                    table.ForeignKey(
                        name: "FK_UserAdvertiseFavorite_Advertise_AdvertiseId",
                        column: x => x.AdvertiseId,
                        principalTable: "Advertise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAdvertiseFavorite_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAdvertiseFavorite_AppUserId",
                table: "UserAdvertiseFavorite",
                column: "AppUserId");
        }
    }
}
