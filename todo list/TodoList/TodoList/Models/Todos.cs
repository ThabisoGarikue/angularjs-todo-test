namespace TodoList.Models
{
    public class Todos
    {
        public int Id { get; set; }
        public required string Item { get; set; }

        public DateTime? CreatedDate { get; set; } = default(DateTime?);
    }
}
