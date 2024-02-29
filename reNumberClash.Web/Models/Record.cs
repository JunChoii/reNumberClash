
public class Record
{
    public int Id { get; set; }
    public int Wins { get; set; }
    public int Losses { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
}