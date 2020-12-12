namespace Application.Interfaces
{
    public interface IRefreshTokenGenerator
    {

        public string Generate(string userName);
    }
}