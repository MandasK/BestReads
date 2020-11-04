using BestReads.Models;
using System.Collections.Generic;

namespace BestReads.Repositories
{
    public interface IReadStateRepository
    {
        void Add(ReadState readState);
        void ChangeState(ReadState readState);
        List<ReadState> GetAllReadStates();
        List<ReadState> GetAllUserReadStates(int currentUserId);
        List<ReadState> GetAllUserReadStatesByState(int currentUserId, int number);
        ReadState GetReadStateById(int id);
    }
}