/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @format int32 */
export enum UserV1UserRole {
  UserRoleROLEUNSPECIFIED = 0,
  UserRoleDEFAULT = 1,
  UserRoleADMIN = 2,
}

/** @format int32 */
export enum UserV1ColorTheme {
  ColorThemeTHEMEUNSPECIFIED = 0,
  ColorThemeAUTO = 1,
  ColorThemeLIGHT = 2,
  ColorThemeDARK = 3,
}

export interface NoteV1CreateNoteRequest {
  content?: string;
  title?: string;
}

export interface NoteV1UpdateNoteRequest {
  content?: string;
  id?: number;
  title?: string;
}

export interface UserV1CreateUserRequest {
  colorTheme?: UserV1ColorTheme;
  login?: string;
  password?: string;
  role?: UserV1UserRole;
}

export interface UserV1LoginRequest {
  login?: string;
  password?: string;
}

export interface UserV1UpdatePasswordRequest {
  id?: number;
  newPassword?: string;
  oldPassword?: string;
}

export interface UserV1UpdateUserRequest {
  colorTheme?: UserV1ColorTheme;
  id?: number;
  login?: string;
  role?: UserV1UserRole;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title No title
 * @contact
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Authenticates a user and returns JWT access, refresh tokens, user info
     *
     * @tags Authentication
     * @name AuthLoginCreate
     * @summary User login
     * @request POST:/api/auth/login
     */
    authLoginCreate: (
      request: UserV1LoginRequest,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/auth/login`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Logs out the user by invalidating refresh token and clearing cookies
     *
     * @tags Authentication
     * @name AuthLogoutCreate
     * @summary User logout
     * @request POST:/api/auth/logout
     */
    authLogoutCreate: (params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/auth/logout`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Rotates refresh token and issues new access and refresh tokens
     *
     * @tags Authentication
     * @name AuthRefreshCreate
     * @summary Refresh access tokens
     * @request POST:/api/auth/refresh
     */
    authRefreshCreate: (params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/auth/refresh`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the health status of the application
     *
     * @tags health
     * @name HealthList
     * @summary Health check endpoint
     * @request GET:/api/health
     */
    healthList: (params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/health`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves all notes for the authenticated user with pagination
     *
     * @tags notes
     * @name NoteList
     * @summary Get all notes
     * @request GET:/api/note
     * @secure
     */
    noteList: (
      query?: {
        /** Limit number of notes */
        limit?: number;
        /** Offset for pagination */
        offset?: number;
        /** Sort in ascending order */
        ascending_order?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/note`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates an existing note for the authenticated user
     *
     * @tags notes
     * @name NoteUpdate
     * @summary Update a note
     * @request PUT:/api/note
     * @secure
     */
    noteUpdate: (note: NoteV1UpdateNoteRequest, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/note`,
        method: "PUT",
        body: note,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new note for the authenticated user
     *
     * @tags notes
     * @name NoteCreate
     * @summary Create a new note
     * @request POST:/api/note
     * @secure
     */
    noteCreate: (note: NoteV1CreateNoteRequest, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/note`,
        method: "POST",
        body: note,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a specific note by ID for the authenticated user
     *
     * @tags notes
     * @name NoteDetail
     * @summary Get a specific note
     * @request GET:/api/note/{id}
     * @secure
     */
    noteDetail: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/note/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a specific note by ID for the authenticated user
     *
     * @tags notes
     * @name NoteDelete
     * @summary Delete a note
     * @request DELETE:/api/note/{id}
     * @secure
     */
    noteDelete: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/note/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves all users with pagination
     *
     * @tags users
     * @name UserList
     * @summary Get all users
     * @request GET:/api/user
     * @secure
     */
    userList: (
      query?: {
        /** Limit number of results */
        limit?: number;
        /** Offset for pagination */
        offset?: number;
        /** Sort in ascending order */
        ascending_order?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/user`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new user account with hashed password
     *
     * @tags users
     * @name UserCreate
     * @summary Create a new user
     * @request POST:/api/user
     */
    userCreate: (
      request: UserV1CreateUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/user`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the password for the authenticated user
     *
     * @tags users
     * @name UserPasswordUpdate
     * @summary Update user password
     * @request PUT:/api/user/password
     * @secure
     */
    userPasswordUpdate: (
      request: UserV1UpdatePasswordRequest,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/user/password`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a specific user by ID
     *
     * @tags users
     * @name UserDetail
     * @summary Get a user by ID
     * @request GET:/api/user/{id}
     * @secure
     */
    userDetail: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/user/${id}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates an existing user's information
     *
     * @tags users
     * @name UserUpdate
     * @summary Update a user
     * @request PUT:/api/user/{id}
     * @secure
     */
    userUpdate: (
      id: string,
      request: UserV1UpdateUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/user/${id}`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a specific user by ID
     *
     * @tags users
     * @name UserDelete
     * @summary Delete a user
     * @request DELETE:/api/user/{id}
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/user/${id}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
