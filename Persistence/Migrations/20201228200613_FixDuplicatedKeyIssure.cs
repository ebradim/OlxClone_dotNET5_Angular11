using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class FixDuplicatedKeyIssure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AdvertiseInfo_Id_AdvertiseId",
                table: "AdvertiseInfo",
                columns: new[] { "Id", "AdvertiseId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AdvertiseInfo_Id_AdvertiseId",
                table: "AdvertiseInfo");
        }
    }
}
