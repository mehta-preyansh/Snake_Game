#include<bits/stdc++.h>
using namespace std;

int main() {
  int t;
  cin>>t;
  while(t--){
    int n;
    cin>>n;
    string s;
    cin>>s;
    bool flag=true;
    int levels = 0;
    int count = 1;
    for(int i=0; i<n-1; i++){
      if(s[i]==s[i+1]){
        count++;
      }
      else{
        flag = false;
        if(levels<count){
          levels=count;
          count=1;
        }
      }
    }
    if(flag){
      levels=count;
    }
    cout<<levels+1<<endl;
  }
  return 0;
}