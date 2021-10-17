import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    currentUserId: string;
    userTenantId: string;
    private tokenInfo: any;
    usersList: any[] = [];

}