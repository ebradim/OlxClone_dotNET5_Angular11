using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddedPhotoEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    UserAdvertiseAdvertiseId = table.Column<int>(type: "integer", nullable: true),
                    UserAdvertiseAppUserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_UserAdvertise_UserAdvertiseAdvertiseId_UserAdvertise~",
                        columns: x => new { x.UserAdvertiseAdvertiseId, x.UserAdvertiseAppUserId },
                        principalTable: "UserAdvertise",
                        principalColumns: new[] { "AdvertiseId", "AppUserId" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_UserAdvertiseAdvertiseId_UserAdvertiseAppUserId",
                table: "Photos",
                columns: new[] { "UserAdvertiseAdvertiseId", "UserAdvertiseAppUserId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");
        }
    }
}
