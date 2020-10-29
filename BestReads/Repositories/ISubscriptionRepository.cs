using BestReads.Models;
using System.Collections.Generic;

namespace BestReads.Repositories
{
    public interface ISubscriptionRepository
    {
        void Add(Subscription subscription);
        List<Subscription> GetAllUserSubscriptions(int subscriber);
        List<Subscription> GetReleventSubscriptions(int subscriber, int provider);
        Subscription GetSubscriptionById(int id);
        void UnSubscribe(int id);
    }
}